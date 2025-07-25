import { NextRequest, NextResponse } from 'next/server';
import { componentLibrary } from '@/components/studio/ComponentLibrary/ComponentLibrary';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const filters = searchParams.get('filters');

  let components = componentLibrary.getAllComponents();

  if (category && category !== 'all') {
    components = componentLibrary.getComponentsByCategory(category);
  }

  if (search) {
    components = componentLibrary.searchComponents(search);
  }

  if (filters) {
    const filterObj = JSON.parse(filters);
    components = componentLibrary.filterComponents(filterObj);
  }

  return NextResponse.json({
    components,
    total: components.length,
    categories: componentLibrary.getStatistics().byCategory
  });
}
