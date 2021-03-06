import React from 'react';
import {deepMerge} from 'grommet/utils';
import {Grid, grommet, ResponsiveContext} from 'grommet';

// set custom breakpoints so we can see the changes
export const customBreakpoints = deepMerge(grommet, {
    global: {
        breakpoints: {
            small: {
                value: 600,
            },
            medium: {
                value: 900,
            },
            large: {
                value: 3000,
            },
        },
    },
});

// columns, rows and areas are for Grid with a known number of contents / boxes.

// If the size is small, we only see 1 column
// If the size is medium, we only see 2 columns
// If the size is either large or xlarge, we see 3 columns
export const columns = {
    small: ['auto'],
    medium: ['auto', 'auto'],
    large: ['auto', 'auto', 'auto', 'auto'],
    xlarge: ['auto', 'auto', 'auto', 'auto'],
};

// If the size is small, we have 3 rows
// If the size is medium, we have 2 rows
// If the size is large or xlarge, we have 1 row
export const rows = {
    small: ['auto', 'auto', 'auto'],
    medium: ['auto', 'auto'],
    large: ['auto'],
    xlarge: ['auto'],
};

export const Responsive = ({
                        children,
                        overrideColumns,
                        overrideRows,
                        areas,
                        ...props
                    }) => (
    <ResponsiveContext.Consumer>
        {size => {
            // Take into consideration if not array is sent but a simple string
            let columnsVal = columns;
            if (columns) {
                if (columns[size]) {
                    columnsVal = columns[size];
                }
            }

            let rowsVal = rows;
            if (rows) {
                if (rows[size]) {
                    rowsVal = rows[size];
                }
            }

            // Also if areas is a simple array not an object of arrays for
            // different sizes
            let areasVal = areas;
            if (areas && !Array.isArray(areas)) areasVal = areas[size];

            return (
                <Grid
                    {...props}
                    areas={!areasVal ? undefined : areasVal}
                    rows={!rowsVal ? size : rowsVal}
                    columns={!columnsVal ? size : columnsVal}
                >
                    {children}
                </Grid>
            );
        }}
    </ResponsiveContext.Consumer>
);