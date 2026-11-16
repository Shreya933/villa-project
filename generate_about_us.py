import os

src_path = r'd:\villa_project\extracted_about_us_v2\src\App.tsx'
dst_path = r'd:\villa_project\src\components\AboutUsView.tsx'

with open(src_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Component declaration
content = content.replace('export default function App() {', 'export const AboutUsView: React.FC = () => {')

# 2. Outer container padding to cleanly sit under the fixed TopNav (height 70px)
target_outer = 'className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden"'
replace_outer = 'className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden pt-[70px]"'
if target_outer in content:
    content = content.replace(target_outer, replace_outer)
    print("Replaced outer container")
else:
    print("Warning: target_outer not found")

# 3. Sticky header position (top-[70px] right below fixed TopNav)
target_header = 'className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80"'
replace_header = 'className="sticky top-[70px] z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80"'
if target_header in content:
    content = content.replace(target_header, replace_header)
    print("Replaced header")
else:
    print("Warning: target_header not found")

# 4. Scroll margin top for sections so headers aren't covered by the 70px topnav + 80px buildpro header
content = content.replace('scroll-mt-20', 'scroll-mt-44')

# 5. Asset link for latest template
content = content.replace('/public/assets/aistudio/latest_template_612dda8b.jpg', '/assets/aistudio/latest_template_612dda8b.jpg')

# 6. Export default
content += '\nexport default AboutUsView;\n'

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Generated AboutUsView.tsx successfully!")

