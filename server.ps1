# 開關 dev server 的小工具
#   .\server.ps1 start     啟動（背景）
#   .\server.ps1 stop      停掉
#   .\server.ps1 restart   重開
#   .\server.ps1 status    看狀態
# 可加 -Port 指定連接埠（預設 5173）。

param(
  [ValidateSet('start', 'stop', 'restart', 'status')]
  [string]$Action = 'status',
  [int]$Port = 5173
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$logFile = Join-Path $root 'temp\dev-server.log'

# 找出真正佔用 port 的 node 進程（排除 VS Code 之類的轉發程序）
function Get-DevServerProcess {
  $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  if (-not $conns) { return @() }
  $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
  Get-Process -Id $pids -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq 'node' }
}

function Show-Status {
  $procs = Get-DevServerProcess
  if ($procs) {
    foreach ($p in $procs) { Write-Host "執行中 http://localhost:$Port  (PID $($p.Id))" -ForegroundColor Green }
  }
  else {
    Write-Host "未執行 (port $Port 沒有 node 在監聽)" -ForegroundColor Yellow
  }
}

function Stop-DevServer {
  $procs = Get-DevServerProcess
  if (-not $procs) {
    Write-Host "沒有東西在跑" -ForegroundColor Yellow
    return
  }
  foreach ($p in $procs) {
    # 連同 npm wrapper 一起收掉
    $parent = (Get-CimInstance Win32_Process -Filter "ProcessId=$($p.Id)").ParentProcessId
    Stop-Process -Id $p.Id -Force
    Write-Host "已停止 vite (PID $($p.Id))" -ForegroundColor Green
    $pp = Get-Process -Id $parent -ErrorAction SilentlyContinue
    if ($pp -and $pp.ProcessName -eq 'node') {
      Stop-Process -Id $parent -Force
      Write-Host "已停止 npm wrapper (PID $parent)" -ForegroundColor Green
    }
  }
}

function Start-DevServer {
  if (Get-DevServerProcess) {
    Write-Host "已經在跑了，先 stop 或用 restart" -ForegroundColor Yellow
    Show-Status
    return
  }
  New-Item -ItemType Directory -Force -Path (Split-Path $logFile) | Out-Null
  $cmd = 'npm run dev -- --port ' + $Port + ' > "' + $logFile + '" 2>&1'
  Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $cmd -WorkingDirectory $root -WindowStyle Hidden

  # 等它把 port 開起來
  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 500
    if (Get-DevServerProcess) { break }
  }
  Show-Status
  Write-Host "log: $logFile"
}

switch ($Action) {
  'start' { Start-DevServer }
  'stop' { Stop-DevServer }
  'restart' { Stop-DevServer; Start-Sleep -Milliseconds 800; Start-DevServer }
  'status' { Show-Status }
}
