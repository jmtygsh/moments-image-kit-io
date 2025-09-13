"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useCallback, useEffect, useState} from "react";

import {useSession} from "next-auth/react";

import {getAllMedia} from "@/actions";
import GridLoader from "@/components/media/grid-loader";
import MasonryGrid from "@/components/media/masonry-grid";
import {useMediaContext} from "@/contexts/media-context";
import type {SelectMediaModel} from "@/db/schema/media";

function HomeContent() {
  const [media, setMedia] = useState<SelectMediaModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {registerRefetchFunction, unregisterRefetchFunction} =
    useMediaContext();

  const searchParams = useSearchParams();
  const {data: session, status} = useSession();
  const router = useRouter();

  // Handle callback URL after authentication
  useEffect(() => {
    if (status === "authenticated" && session) {
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl) {
        router.push(callbackUrl);
      }
    }
  }, [session, status, searchParams, router]);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllMedia({page: 1, pageSize: 50});

      if (!result.success) {
        setError("Something went wrong");
      } else {
        setMedia(result.data!.media);
      }
    } catch (err) {
      setError("Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  useEffect(() => {
    registerRefetchFunction("homepage", fetchMedia);
    return () => {
      unregisterRefetchFunction("homepage");
    };
  }, [fetchMedia, registerRefetchFunction, unregisterRefetchFunction]);

  return (
    <>
      <div className="mt-12 sm:mt-20 sm:text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
          Your personal{" "}
          <span className="font-montserrat bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text tracking-tight text-transparent dark:from-pink-400 dark:to-pink-600">
            memory vault
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Upload, transform, and manage your photos and videos with AI-powered
          tools. Create stunning visuals with just a few clicks.
        </p>
      </div>

      <h2 className="mt-20 mb-2 text-2xl font-medium text-gray-900 sm:mt-32 dark:text-white">
        Your Media Collection
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Click on any item to edit and transform it
      </p>

      {loading ? (
        <GridLoader />
      ) : error ? (
        <div className="py-24 text-center">
          <h3 className="mb-2 text-lg">
            Oops, failed to load media try again.
          </h3>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={fetchMedia}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <MasonryGrid media={media} />
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<GridLoader />}>
      <HomeContent />
    </Suspense>
  );
}
