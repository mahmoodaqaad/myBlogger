import React from 'react'

const SkeletonShow = ({ length = 1, className = "", width = "100%", height = "100%" }) => {
    const skeletonItems = Array.from({ length }).map((_, index) => (
        <div key={index} className={className}>
            <div
                className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg"
                style={{ width, height: height || '1rem' }}
            ></div>
        </div>
    ));

    return <>{skeletonItems}</>;
}

export default SkeletonShow;
