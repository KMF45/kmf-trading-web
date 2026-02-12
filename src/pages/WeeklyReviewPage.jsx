import { FaClipboardCheck } from 'react-icons/fa';

const WeeklyReviewPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaClipboardCheck className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Weekly Review</h1>
          <p className="text-sm text-kmf-text-tertiary">Self-evaluation and goal tracking</p>
        </div>
      </div>
      <div className="bg-kmf-panel rounded-xl p-8 border border-kmf-accent/10 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-kmf-accent/10 flex items-center justify-center mb-4">
          <FaClipboardCheck className="text-kmf-accent text-3xl" />
        </div>
        <h2 className="text-xl font-semibold text-kmf-text-primary mb-2">Coming Soon</h2>
        <p className="text-kmf-text-tertiary max-w-md mx-auto">
          This feature is being built. It will include full functionality matching the Android app.
        </p>
      </div>
    </div>
  );
};

export default WeeklyReviewPage;
