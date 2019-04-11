import React, {lazy, Suspense} from 'react';

import ErrorBoundary from 'Components/ErrorBoundary';
import Spinner from 'Components/Spinner';

const AsyncComponent = ({load, loader = <Spinner/>, ...rest}) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const Component = lazy(load);

    return (
        <ErrorBoundary>
            <Suspense fallback={loader}>
                <Component {...rest}/>
            </Suspense>
        </ErrorBoundary>
    );
};

export default AsyncComponent;