import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonShow = (props) => {

    const skeletonshow = Array.from({ length: props.length ||1 }).map((_, index) => (
        <div key={index} className={props.className}>
            <Skeleton width={props.width||"100%"} height={props.height} className="skeleton-custom"></Skeleton>
        </div>
    ));
    return skeletonshow
}

export default SkeletonShow
