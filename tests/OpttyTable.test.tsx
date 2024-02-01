import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { OpttyTable } from '../src/components/index'

const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
]

const columns = ['name', 'age']

const actions = [
  { label: 'Refund', onClick: jest.fn() },
  { label: 'Retry', onClick: jest.fn() },
]

const testId = 'sample'

describe('OpttyTable Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the table headers', () => {
    render(<OpttyTable data={data} columns={columns} actions={actions} testId={testId} />)

    expect(screen.getByText('name')).toBeInTheDocument()
    expect(screen.getByText('age')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders the table with data and actions', () => {
    render(<OpttyTable data={data} columns={columns} actions={actions} testId={testId} />)

    fireEvent.click(screen.getByLabelText('Actions', { selector: `[aria-controls^="actions-icon-${testId}-1"]` }))

    expect(screen.getByTestId(`${testId}-table`)).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Refund', { selector: `#actions-menu-${testId}-1 [role="menuitem"]` })).toBeInTheDocument()
    expect(screen.getByText('Retry', { selector: `#actions-menu-${testId}-1 [role="menuitem"]` })).toBeInTheDocument()
  })

  it('calls the onClick function when the Refund button is clicked', () => {
    render(<OpttyTable data={data} columns={columns} actions={actions} testId={testId} />)

    fireEvent.click(screen.getByLabelText('Actions', { selector: `[aria-controls^="actions-icon-${testId}-1"]` }))
    fireEvent.click(screen.getByText('Refund', { selector: `#actions-menu-${testId}-1 [role="menuitem"]` }))

    expect(actions[0].onClick).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
    expect(actions[1].onClick).not.toHaveBeenCalled()
  })

  it('calls the onClick function when the Retry button is clicked', () => {
    render(<OpttyTable data={data} columns={columns} actions={actions} testId={testId} />)

    fireEvent.click(screen.getByLabelText('Actions', { selector: `[aria-controls^="actions-icon-${testId}-1"]` }))
    fireEvent.click(screen.getByText('Retry', { selector: `#actions-menu-${testId}-1 [role="menuitem"]` }))

    expect(actions[1].onClick).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
    expect(actions[0].onClick).not.toHaveBeenCalled()
  })

  it('does not call any onClick function when the menu is closed without selecting an action', () => {
    render(<OpttyTable data={data} columns={columns} actions={actions} testId={testId} />)

    fireEvent.click(screen.getByLabelText('Actions', { selector: `[aria-controls^="actions-icon-${testId}-2"]` }))
    fireEvent.click(screen.getByLabelText('Actions', { selector: `[aria-controls^="actions-icon-${testId}-2"]` }))

    expect(actions[0].onClick).not.toHaveBeenCalled()
    expect(actions[1].onClick).not.toHaveBeenCalled()
  })
})
