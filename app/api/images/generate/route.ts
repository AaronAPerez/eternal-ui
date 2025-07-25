import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { componentId, variant, props, options } = await request.json();
  
  const generator = new ComponentImageGenerator();
  const component = componentLibrary.getComponentById(componentId);
  
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }

  try {
    const imageUrl = await generator.generateComponentPreview(componentId, variant, props);
  
  return NextResponse.json({ imageUrl });
}