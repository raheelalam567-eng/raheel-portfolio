$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

Write-Host "=========================================" -ForegroundColor Green
Write-Host "    Raheel Alam Portfolio Local Server   " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

try {
    $listener.Start()
} catch {
    Write-Host "ERROR: Could not start server." -ForegroundColor Red
    Write-Host "The port $port might already be in use." -ForegroundColor Yellow
    Write-Host "Exception: $_" -ForegroundColor DarkGray
    return
}

Write-Host "Server successfully started!" -ForegroundColor Green
Write-Host "Local URL: http://localhost:$port/" -ForegroundColor Cyan
Write-Host "Press Ctrl+C in this window to stop the server." -ForegroundColor Yellow
Write-Host "-----------------------------------------"

# Auto-open browser
try {
    Start-Process "http://localhost:$port/"
} catch {
    Write-Host "Could not auto-open browser. Please manually navigate to http://localhost:$port/" -ForegroundColor Yellow
}

# Serve requests
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $url = $request.Url.LocalPath
        # Default document
        if ($url -eq "/" -or $url.EndsWith("/")) {
            $url = $url + "index.html"
        }
        
        # Replace forward slashes with backslashes for Windows path resolution
        $relPath = $url.TrimStart('/').Replace('/', '\')
        $filePath = Join-Path (Get-Location) $relPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Determine content type based on extension
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html"  { "text/html; charset=utf-8" }
                ".css"   { "text/css; charset=utf-8" }
                ".js"    { "application/javascript; charset=utf-8" }
                ".png"   { "image/png" }
                ".jpg"   { "image/jpeg" }
                ".jpeg"  { "image/jpeg" }
                ".gif"   { "image/gif" }
                ".svg"   { "image/svg+xml" }
                ".ico"   { "image/x-icon" }
                ".woff"  { "font/woff" }
                ".woff2" { "font/woff2" }
                ".ttf"   { "font/ttf" }
                ".json"  { "application/json; charset=utf-8" }
                default  { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "[200] Serving: $url" -ForegroundColor Green
        } else {
            # 404 response
            $response.StatusCode = 404
            $errHtml = "<html><body><h1>404 Not Found</h1><p>The file $url was not found on this local server.</p></body></html>"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errHtml)
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            Write-Host "[404] Not Found: $url" -ForegroundColor Red
        }
        $response.Close()
    } catch {
        # Handle exceptions gracefully (e.g., connection closed by browser before transfer finished)
    }
}
