import Head from 'next/head';

const Loading = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Onlyself | Loading...</title>
      </Head>
      <div
        style={{ backgroundImage: `url(/images/loading-background.jpg)` }}
        className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat font-poppins"
      >
        <div className="absolute inset-0 h-full w-full bg-black bg-opacity-20 backdrop-blur-sm" />
        <div className="z-10 flex w-full flex-col items-center gap-y-5">
          <div className="flex flex-row items-center font-poppins text-5xl font-bold">
            <span className="text-accent-4">Only</span>
            <span className="text-accent-4">self</span>
          </div>
          <h1 className="text-lg font-light text-white">Loading...</h1>
          <p className="text-xs font-light text-white">Because great things take a little time.</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
