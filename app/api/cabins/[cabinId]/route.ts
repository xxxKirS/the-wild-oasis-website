import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ cabinId: string }> }
) => {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(+cabinId),
      getBookedDatesByCabinId(+cabinId),
    ]);

    return Response.json({
      cabin,
      bookedDates,
    });
  } catch {
    return Response.json(
      { message: 'Could not retrieve cabin data' },
      { status: 500 }
    );
  }
};

// export async function POST() {}
