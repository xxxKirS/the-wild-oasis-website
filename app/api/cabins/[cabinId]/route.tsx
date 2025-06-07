import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

type GetType = (
  request: Request,
  { params }: { params: { cabinId: string } }
) => Promise<Response>;

export const GET: GetType = async (request, { params }) => {
  const { cabinId } = params;

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
