import os
from PIL import Image, ImageFilter
import numpy as np

target_dir = r"c:\Users\Dell\Desktop\greko2.0\public\assets"
single_cup_path = os.path.join(target_dir, "greko_single_cup.png")
splash_path = os.path.join(target_dir, "cup_splash.jpg")

# 1. Create a transparent splash background
if os.path.exists(splash_path) and os.path.exists(single_cup_path):
    splash_img = Image.open(splash_path).convert("RGBA")
    cup_img = Image.open(single_cup_path).convert("RGBA")
    
    # Remove dark background from splash
    splash_data = np.array(splash_img, dtype=np.float32)
    r, g, b, a = splash_data[:, :, 0], splash_data[:, :, 1], splash_data[:, :, 2], splash_data[:, :, 3]
    brightness = (r + g + b) / 3.0
    
    # Smooth alpha for dark background
    threshold = 28
    soft = 25
    alpha = np.ones_like(brightness)
    alpha[brightness <= threshold] = 0.0
    trans = (brightness > threshold) & (brightness < (threshold + soft))
    alpha[trans] = (brightness[trans] - threshold) / float(soft)
    splash_data[:, :, 3] = alpha * 255.0
    
    clean_splash = Image.fromarray(np.uint8(splash_data), mode="RGBA")
    
    # Scale single cup to fit seamlessly inside splash
    w_cup = int(clean_splash.width * 0.72)
    h_cup = int(clean_splash.height * 0.72)
    cup_resized = cup_img.resize((w_cup, h_cup), Image.Resampling.LANCZOS)
    
    # Composite
    comp = Image.new("RGBA", clean_splash.size, (0, 0, 0, 0))
    # Place splash behind
    comp.paste(clean_splash, (0, 0), clean_splash)
    # Place blue cup
    x = (clean_splash.width - w_cup) // 2
    y = (clean_splash.height - h_cup) // 2 + 10
    comp.paste(cup_resized, (x, y), cup_resized)
    
    out_path = os.path.join(target_dir, "greko_cup_splash.png")
    comp.save(out_path, "PNG", optimize=True)
    print(f"Created: {out_path}")
