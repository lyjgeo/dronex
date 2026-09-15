$ErrorActionPreference = 'Stop'
$assets = Join-Path $PSScriptRoot 'assets'
New-Item -ItemType Directory -Force -Path $assets | Out-Null

$files = @(
    @{ Name = "hero.jpg"; Url = "https://images.pexels.com/photos/32018248/pexels-photo-32018248.jpeg?auto=compress&cs=tinysrgb&w=2000" }
    @{ Name = "ai-vision.jpg"; Url = "https://images.pexels.com/photos/4173486/pexels-photo-4173486.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "slam-vio.jpg"; Url = "https://images.pexels.com/photos/12794566/pexels-photo-12794566.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "edge-ai.jpg"; Url = "https://images.pexels.com/photos/15499219/pexels-photo-15499219.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "agriculture.jpg"; Url = "https://images.pexels.com/photos/37288733/pexels-photo-37288733.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "mapping.jpg"; Url = "https://images.pexels.com/photos/7457211/pexels-photo-7457211.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "urban-airspace.jpg"; Url = "https://images.pexels.com/photos/18623743/pexels-photo-18623743.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "delivery.jpg"; Url = "https://images.pexels.com/photos/34182337/pexels-photo-34182337.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "inspection.jpg"; Url = "https://images.pexels.com/photos/15908831/pexels-photo-15908831.jpeg?auto=compress&cs=tinysrgb&w=1200" }
    @{ Name = "dji.jpg"; Url = "https://images.pexels.com/photos/724919/pexels-photo-724919.jpeg?auto=compress&cs=tinysrgb&w=1000" }
    @{ Name = "skydio.jpg"; Url = "https://images.pexels.com/photos/13310697/pexels-photo-13310697.jpeg?auto=compress&cs=tinysrgb&w=1000" }
    @{ Name = "anduril.jpg"; Url = "https://images.pexels.com/photos/1757697/pexels-photo-1757697.jpeg?auto=compress&cs=tinysrgb&w=1000" }
    @{ Name = "wing.jpg"; Url = "https://images.pexels.com/photos/12794566/pexels-photo-12794566.jpeg?auto=compress&cs=tinysrgb&w=1000" }
)
foreach ($item in $files) {
    $dest = Join-Path $assets $item.Name
    Write-Host "Downloading $($item.Name)..."
    try {
        Invoke-WebRequest -Uri $item.Url -OutFile $dest -UseBasicParsing
        $size = (Get-Item $dest).Length
        if ($size -lt 1000) { throw "Downloaded file is unexpectedly small ($size bytes)." }
    } catch {
        Write-Warning "FAILED: $($item.Name) -- $($_.Exception.Message)"
    }
}
Write-Host ""
Write-Host "Done. Check the assets folder, then upload index.html and assets together to GitHub."
