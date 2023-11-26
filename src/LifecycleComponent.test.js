import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LifecycleComponent from './LifecycleComponent';

describe('LifecycleComponent', () => {
    // Test for initial render (loading state)
    it('renders with initial loading state', () => {
        render(<LifecycleComponent />);
        expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    // Test for data fetch on mount
    it('should fetch data on mount', async () => {
        render(<LifecycleComponent />);
        const dataElement = await screen.findByText('Fetched data', {}, { timeout: 2000 });
        expect(dataElement).toBeInTheDocument();
    });

    // Test for state update on prop change
    it('should update count on prop change', async () => {
        const { rerender } = render(<LifecycleComponent updateTrigger={false} />);
        expect(screen.getByText('Update Count: 0')).toBeInTheDocument();

        rerender(<LifecycleComponent updateTrigger={true} />);
        expect(await screen.findByText('Update Count: 1')).toBeInTheDocument();
    });

    // Test for no update when same props are provided
    it('does not update count when the same props are provided', async () => {
        const { rerender } = render(<LifecycleComponent updateTrigger={false} />);
        rerender(<LifecycleComponent updateTrigger={false} />);
        expect(screen.getByText('Update Count: 0')).toBeInTheDocument();
    });

    // Test for componentWillUnmount (mocking console.log)
    it('logs on component unmount', () => {
        const logSpy = jest.spyOn(console, 'log');
        const { unmount } = render(<LifecycleComponent />);
        unmount();
        expect(logSpy).toHaveBeenCalledWith('Component is being unmounted');
    });

    // Test for multiple updates
    it('updates count correctly for multiple prop changes', async () => {
        const { rerender } = render(<LifecycleComponent updateTrigger={false} />);
        rerender(<LifecycleComponent updateTrigger={true} />);
        rerender(<LifecycleComponent updateTrigger={false} />);
        rerender(<LifecycleComponent updateTrigger={true} />);
        expect(await screen.findByText('Update Count: 3')).toBeInTheDocument();
    });
});
