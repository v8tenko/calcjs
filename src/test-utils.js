import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import {store} from "./app/store";
// Import your own reducer

function render(
  ui,
  customOptions
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper , ...customOptions})
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
