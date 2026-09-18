import os
from PIL import Image, ImageFilter, ImageOps
import numpy as np

def remove_light_background(input_path, output_path, threshold=242, soft_range=20):
    """
    Removes white / off-white background and creates an alpha channel with smooth edge transition.
    """
    if not os.path.exists(input_path):
        print(f"Skipping (not found): {input_path}")
        return

    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)

    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

    # Calculate brightness / whiteness
    # Pixels where R, G, B are all high and saturation is very low
    max_val = np.maximum(np.maximum(r, g), b)
    min_val = np.minimum(np.minimum(r, g), b)
    diff = max_val - min_val

    # Whiteness index
    whiteness = (r + g + b) / 3.0

    # Mask calculation:
    # 0 = transparent, 1 = opaque
    # If whiteness > threshold and diff is small (gray/white background)
    alpha = np.ones_like(whiteness)

    # Gradient falloff
    bg_condition = (whiteness >= (threshold - soft_range)) & (diff < 25)
    
    # Scale alpha in the transition zone
    alpha_scale = (threshold - whiteness) / float(soft_range)
    alpha_scale = np.clip(alpha_scale, 0.0, 1.0)

    # For pure background
    alpha[whiteness >= threshold] = 0.0
    # For transition
    transition_mask = (whiteness >= (threshold - soft_range)) & (whiteness < threshold) & (diff < 25)
    alpha[transition_mask] = alpha_scale[transition_mask]

    data[:, :, 3] = alpha * 255.0

    result = Image.fromarray(np.uint8(data), mode="RGBA")
    
    # Save optimized PNG
    result.save(output_path, "PNG", optimize=True)
    print(f"Processed: {output_path}")

def remove_dark_background(input_path, output_path, threshold=30, soft_range=20):
    """
    Removes pure black / dark background for assets that have dark backgrounds.
    """
    if not os.path.exists(input_path):
        print(f"Skipping (not found): {input_path}")
        return

    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)

    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    brightness = (r + g + b) / 3.0

    alpha = np.ones_like(brightness)
    alpha[brightness <= threshold] = 0.0

    transition_mask = (brightness > threshold) & (brightness < (threshold + soft_range))
    alpha_scale = (brightness - threshold) / float(soft_range)
    alpha_scale = np.clip(alpha_scale, 0.0, 1.0)
    alpha[transition_mask] = alpha_scale[transition_mask]

    data[:, :, 3] = alpha * 255.0
    result = Image.fromarray(np.uint8(data), mode="RGBA")
    result.save(output_path, "PNG", optimize=True)
    print(f"Processed dark bg: {output_path}")

def main():
    target_dir = r"c:\Users\Dell\Desktop\greko2.0\public\assets"
    source_greko_dir = r"c:\Users\Dell\Desktop\greko\assets"

    # 1. Process Blue Greko 3 Cups
    three_cups_src = os.path.join(source_greko_dir, "Three_blue_coffee_cups_arranged_20260917100912.png")
    three_cups_out = os.path.join(target_dir, "greko_three_cups.png")
    remove_light_background(three_cups_src, three_cups_out, threshold=240, soft_range=25)

    # 2. Process Single Blue Greko Cup Hovering
    single_cup_src = os.path.join(source_greko_dir, "Blue_coffee_cup_hovering_20260917100932.png")
    single_cup_out = os.path.join(target_dir, "greko_single_cup.png")
    remove_light_background(single_cup_src, single_cup_out, threshold=238, soft_range=25)

    # 3. Process Crumpled Cup
    crumpled_src = os.path.join(source_greko_dir, "Crumpled_blue_paper_coffee_cup_20260917100851.png")
    crumpled_out = os.path.join(target_dir, "greko_crumpled_cup.png")
    remove_light_background(crumpled_src, crumpled_out, threshold=240, soft_range=20)

    # 4. Process 3D Cup Text
    cup_3d_src = os.path.join(target_dir, "cup_3d_text.jpg")
    cup_3d_out = os.path.join(target_dir, "cup_3d_text_transparent.png")
    remove_light_background(cup_3d_src, cup_3d_out, threshold=245, soft_range=20)

    # 5. Process Bean Burst
    bean_src = os.path.join(target_dir, "beans_burst.jpg")
    bean_out = os.path.join(target_dir, "beans_burst_transparent.png")
    remove_light_background(bean_src, bean_out, threshold=245, soft_range=20)

    # 6. Process Menu Drinks
    drinks = [
        "drink_latte", "drink_espresso", "drink_macchiato",
        "drink_cold_brew", "drink_mocha", "drink_hazelnut"
    ]
    for d in drinks:
        src = os.path.join(target_dir, f"{d}.jpg")
        out = os.path.join(target_dir, f"{d}_transparent.png")
        remove_light_background(src, out, threshold=248, soft_range=15)

    # 7. Create Composite Feature Cup with Splash & Blue Greko Cup
    try:
        # Load single cup and splash
        splash_src = os.path.join(target_dir, "cup_splash.jpg")
        if os.path.exists(single_cup_out) and os.path.exists(splash_src):
            splash_img = Image.open(splash_src).convert("RGBA")
            cup_img = Image.open(single_cup_out).convert("RGBA")
            
            # Resize and position cup over splash
            cup_resized = cup_img.resize((int(splash_img.width * 0.75), int(splash_img.height * 0.75)), Image.Resampling.LANCZZOS if hasattr(Image.Resampling, 'LANCZOS') else Image.LANCZOS)
            
            # Create composite
            composite = Image.new("RGBA", splash_img.size, (0, 0, 0, 0))
            # Paste splash
            composite.paste(splash_img, (0, 0))
            # Center cup
            offset_x = (splash_img.width - cup_resized.width) // 2
            offset_y = (splash_img.height - cup_resized.height) // 2 - 10
            composite.paste(cup_resized, (offset_x, offset_y), cup_resized)
            
            comp_out = os.path.join(target_dir, "greko_cup_splash.png")
            composite.save(comp_out, "PNG")
            print(f"Created composite: {comp_out}")
    except Exception as e:
        print(f"Composite error: {e}")

if __name__ == "__main__":
    main()
