import 'photoswipe/dist/photoswipe.css';
import { LoadMore } from "@/components/loadMore";
import { Header } from '@/components/header';

export default async function Home() {

  return (
    <>
      <Header />
      <LoadMore />
    </>
  );
}
