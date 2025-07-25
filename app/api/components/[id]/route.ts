export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const component = componentLibrary.getComponentById(params.id);
  
  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }

  const relatedComponents = componentLibrary.getRelatedComponents(params.id);
  
  return NextResponse.json({
    component,
    relatedComponents
  });
}