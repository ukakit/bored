// import PocketBase from 'pocketbase';
import Link from 'next/link';
import styles from './Posts.module.css';
import CreateNote from './CreatePost';

// next 13 variables to export to take care of cache
// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'


async function getPosts() {
  // Pocket base's sdk instead of Fetch:
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('notes');
  // return result?.items as any[];
  const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records?page=1&perPage=30', { cache: 'no-store' });
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const posts = await getPosts();

  return(
    <div>
      <h1>Posts</h1>
      <div className={styles.grid}>
        {posts?.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>

      <CreateNote />
    </div>
  );
}

function Post({ post }: any) {
  const { id, title, content, created } = post || {};

  return (
    <Link href={`/posts/${id}`}>
      <div className={styles.post}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}