import React from 'react'
import { fireEvent, screen, render, waitFor} from '@testing-library/react'
import App from '../src/App'

import { fetchShow as mockFetchShow } from '../src/api/fetchShow'
jest.mock('../src/api/fetchShow');

test('render without errors', ()=> {
    render(<App/>)
});

test('fetches and renders show data', async ()=>{
    render(<App/>);
    mockFetchShow.mockResolvedValueOnce({
        data:[
            {episode_name: "Episode 1", episode_id:1},
            {episode_name: "Episode 2", episode_id:2}
        ]
    });

    const dropdown = screen.getByRole('dropdown');
    fireEvent.click(dropdown);

    await waitFor(() => {
        console.log(mockFetchShow.mock);
        const shows = screen.getAllByTestId('show');
        expect(shows).toHaveLength(2);
    });
});
