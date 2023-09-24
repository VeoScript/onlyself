import NextNprogress from 'nextjs-progressbar';

const NProgress: React.FC = () => {
  return (
    <NextNprogress
      color="#FFFFFF"
      startPosition={0.3}
      stopDelayMs={200}
      height={4}
      showOnShallow={true}
      options={{ easing: 'ease', speed: 500 }}
    />
  );
};

export default NProgress;
