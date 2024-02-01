import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { Action, DataTableProps } from './table'

const OpttyTable = <C extends string>({ data, columns, actions, testId }: DataTableProps<C>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<any | null>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  const handleActionClick = (action: Action) => {
    if (selectedRow !== null) {
      action.onClick(selectedRow)
    }
    handleMenuClose()
  }

  return (
    <TableContainer data-testid={`${testId}-table`}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
              <TableCell>
                <IconButton
                  aria-controls={`actions-icon-${testId}-${row.id}`}
                  aria-label='Actions'
                  size='small'
                  onClick={(event) => handleMenuOpen(event, row)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`actions-menu-${testId}-${row.id}`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {actions.map((action) => (
                    <MenuItem key={action.label} onClick={() => handleActionClick(action)}>
                      {action.label}
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

OpttyTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  testId: PropTypes.string.isRequired,
}

export default OpttyTable
