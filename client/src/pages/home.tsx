import Layout from "@/components/layout";
import StoryBar from "@/components/story-bar";
import PostCard from "@/components/post-card";
import { useFeed, useStories, useCurrentProfile } from "@/hooks/use-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: posts, isLoading: postsLoading } = useFeed();
  const { data: stories, isLoading: storiesLoading } = useStories();
  const { data: currentUser } = useCurrentProfile();

  return (
    <Layout>
      {/* Restrict width for Home Feed to standard size */}
      <div className="flex flex-col gap-2 md:gap-6 md:pt-6 w-full max-w-[630px] mx-auto">
        {storiesLoading ? (
          <div className="flex gap-4 p-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-16 h-16 rounded-full" />
            ))}
          </div>
        ) : (
          <StoryBar stories={stories || []} currentUserAvatar={currentUser?.avatar_url || ""} />
        )}
        
        <div className="flex flex-col items-center w-full">
          {postsLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="w-full mb-4 p-4 border-b">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="w-full h-96 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : posts && posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg mb-2">لا توجد منشورات بعد</p>
              <p className="text-sm">ابدأ بمتابعة مستخدمين آخرين لرؤية منشوراتهم هنا</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
