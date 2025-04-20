const intialState = {
    value: 0,
}

export const counterSlice = createSlice({

    name: 'counter',
    intialState,
    reducer: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        }
    }

}
)

export const {increment}