import {redirect} from "next/navigation";

import {getMedia} from "@/actions";
import NotFound from "@/app/not-found";
import {auth} from "@/auth";
import StudioClient from "@/components/studio/studio-client";

interface RouteParams {
  params: Promise<{id: string}>;
}

const Studio = async ({params}: RouteParams) => {
  // Check authentication on server side
  const session = await auth();

  if (!session) {
    redirect(`/?callbackUrl=/studio/${(await params).id}`);
  }

  const {id} = await params;
  const media = await getMedia({id});

  if (!media.success || !media) {
    return <NotFound />;
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <StudioClient media={media.data} />
    </div>
  );
};

export default Studio;
