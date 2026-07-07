$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$grid = Get-Content "$dir\projects-grid.html" -Raw -Encoding UTF8
$brands = Get-Content "$dir\brands-strip.html" -Raw -Encoding UTF8

$files = @("index.html", "projects.html", "reviews.html")

foreach ($file in $files) {
  $path = Join-Path $dir $file
  if (-not (Test-Path $path)) { continue }
  $html = Get-Content $path -Raw -Encoding UTF8

  if ($html -match '(?s)(<div class="projects-grid reveal">)(.*?)(</div>\s*(?:<p class="section-cta-text|<p class="section-cta))') {
    $html = $html -replace '(?s)(<div class="projects-grid reveal">)(.*?)(</div>\s*(?:<p class="section-cta-text|<p class="section-cta))', "`$1`n$grid`$3"
    Write-Host "Updated projects grid in $file"
  } elseif ($html -match '(?s)(<div class="container projects-grid reveal">)(.*?)(</div>\s*</section>)') {
    $html = $html -replace '(?s)(<div class="container projects-grid reveal">)(.*?)(</div>\s*</section>)', "`$1`n$grid`$3"
    Write-Host "Updated projects page grid in $file"
  }

  if ($file -eq "index.html" -or $file -eq "reviews.html") {
    if ($html -match '(?s)(<div class="brands-strip[^"]*">)(.*?)(</div>\s*</div>\s*</section>)') {
      $html = $html -replace '(?s)(<p>Trusted by Growing Brands</p>\s*<p>Brands[^<]*</p>\s*)?(<div class="brands-strip[^"]*">)(.*?)(</div>)', "`$2`n$brands"
      Write-Host "Updated brands in $file"
    }
  }

  Set-Content $path -Value $html -Encoding UTF8 -NoNewline
}

Write-Host "Done."
