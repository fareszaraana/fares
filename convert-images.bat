@echo off
echo 🚀 Starting image optimization...

REM Convert PNG images to WebP (you need to install WebP tools first)
for %%i in (images\*.png) do (
    echo Converting %%i to WebP...
    cwebp -q 85 "%%i" -o "%%~dpni.webp"
)

REM Convert JPG images to WebP
for %%i in (images\*.jpg) do (
    echo Converting %%i to WebP...
    cwebp -q 85 "%%i" -o "%%~dpni.webp"
)

REM Convert JPEG images to WebP
for %%i in (images\*.jpeg) do (
    echo Converting %%i to WebP...
    cwebp -q 85 "%%i" -o "%%~dpni.webp"
)

echo 🎉 Image optimization complete!
echo 💡 Download WebP tools from: https://developers.google.com/speed/webp/download
echo 💡 Add cwebp.exe to your system PATH