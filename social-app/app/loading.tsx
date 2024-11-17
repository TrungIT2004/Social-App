export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative">
        <div className="w-32 h-32 border-8 border-gray-200 rounded-full"></div>
        <div
          className="absolute top-0 left-0 w-32 h-32 border-8 border-purple-600 rounded-full animate-spin"
          style={{
            borderTopColor: 'transparent',
            animationDuration: '1s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        ></div>
      </div>
      <h2 className="mt-8 text-3xl font-bold text-gray-800">Loading...</h2>
      <p className="mt-2 text-lg text-gray-600">Please wait while we prepare your experience</p>
    </div>
  )
}