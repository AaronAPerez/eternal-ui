import { CanvasComponent } from "@/types/grid";

export const exportGridToCode = (gridConfig: GridConfig, components: CanvasComponent[]) => {
  return {
    html: generateHTML(components),
    css: generateCSS(gridConfig, components),
    react: generateReactComponent(gridConfig, components),
    json: JSON.stringify({ gridConfig, components }, null, 2)
  };
};

const generateHTML = (components: CanvasComponent[]) => {
  return components.map(comp => 
    `<div class="component-${comp.id}" style="position: absolute; left: ${comp.position.x}px; top: ${comp.position.y}px; width: ${comp.size.width}px; height: ${comp.size.height}px;">
      ${comp.content}
    </div>`
  ).join('\n');
};