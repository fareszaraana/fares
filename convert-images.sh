#!/bin/bash
# Image optimization script for WebP conversion
# Run this script to convert your images to WebP format

echo "🚀 Starting image optimization..."

# Convert PNG images to WebP
for img in images/*.png; do
    if [ -f "$img" ]; then
        cwebp -q 85 "$img" -o "${img%.png}.webp"
        echo "✅ Converted $img to WebP"
    fi
done

# Convert JPG images to WebP
for img in images/*.jpg; do
    if [ -f "$img" ]; then
        cwebp -q 85 "$img" -o "${img%.jpg}.webp"
        echo "✅ Converted $img to WebP"
    fi
done

# Convert JPEG images to WebP
for img in images/*.jpeg; do
    if [ -f "$img" ]; then
        cwebp -q 85 "$img" -o "${img%.jpeg}.webp"
        echo "✅ Converted $img to WebP"
    fi
done

echo "🎉 Image optimization complete!"
echo "💡 Make sure to install cwebp: sudo apt-get install webp (Linux) or brew install webp (macOS)"