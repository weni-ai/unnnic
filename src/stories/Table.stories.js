import unnnicTable from '../components/Table/Table.vue';
import unnnicTableRow from '../components/Table/TableRow.vue';
import UnnnicButton from '../components/Button/Button.vue';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import UnnnicTag from '@/components/Tag/Tag.vue';
import { action } from 'storybook/actions';

const tableRows = [
  {
    invoice:
      'INV001 — With ellipsis lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: { scheme: 'green', text: 'Paid' },
    method: 'Credit Card',
    amount: '$250.00',
  },
  {
    invoice:
      'INV002 — Without ellipsis lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: { scheme: 'red', text: 'Pending' },
    method: 'Bank Transfer',
    amount: '$199.00',
  },
  {
    invoice: 'INV003 — Monthly subscription',
    status: { scheme: 'green', text: 'Paid' },
    method: 'PayPal',
    amount: '$49.00',
  },
  {
    invoice: 'INV004 — Enterprise license',
    status: { scheme: 'orange', text: 'Overdue' },
    method: 'Wire Transfer',
    amount: '$1,200.00',
  },
];

export default {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<div>**Transitional component to replace the legacy [Table](?path=/docs/data-display-tablenext--default) in the future.**
        <br/>
        <br/>
        A composable semantic table built with HTML table elements and subcomponents.
        <br/>
        Use \`UnnnicTable\` with \`version="2"\` as the wrapper, then compose rows and cells with \`UnnnicTableHeader\`, \`UnnnicTableBody\`, \`UnnnicTableHead\`, \`UnnnicTableCell\`, and \`UnnnicTableRow\`.
        <br/>
        Supports text ellipsis, left/center/right alignment, custom cell content via slots, and clickable rows with keyboard interaction.
        </div>`,
      },
    },
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          'Default table with header, body rows, text ellipsis, slot content for tags, and a clickable row.',
      },
      source: {
        code: `<UnnnicTable version="2">
  <UnnnicTableHeader>
    <UnnnicTableRow>
      <UnnnicTableHead width="50%">Invoice</UnnnicTableHead>
      <UnnnicTableHead width="20%">Status</UnnnicTableHead>
      <UnnnicTableHead width="15%">Method</UnnnicTableHead>
      <UnnnicTableHead width="15%">Amount</UnnnicTableHead>
    </UnnnicTableRow>
  </UnnnicTableHeader>
  <UnnnicTableBody>
    <UnnnicTableRow>
      <UnnnicTableCell ellipsis>
        INV001 — With ellipsis lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </UnnnicTableCell>
      <UnnnicTableCell>
        <UnnnicTag scheme="green" text="Paid" />
      </UnnnicTableCell>
      <UnnnicTableCell>Credit Card</UnnnicTableCell>
      <UnnnicTableCell>$250.00</UnnnicTableCell>
    </UnnnicTableRow>
    <UnnnicTableRow @click="handleRowClick">
      <UnnnicTableCell>
        INV002 — Without ellipsis lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </UnnnicTableCell>
      <UnnnicTableCell>
        <UnnnicTag scheme="red" text="Pending" />
      </UnnnicTableCell>
      <UnnnicTableCell>Bank Transfer</UnnnicTableCell>
      <UnnnicTableCell>$199.00</UnnnicTableCell>
    </UnnnicTableRow>
  </UnnnicTableBody>
</UnnnicTable>`,
      },
    },
  },
  render: () => ({
    components: {
      unnnicTable,
      unnnicTableRow,
      TableHeader,
      TableBody,
      TableHead,
      TableCell,
      UnnnicTag,
    },
    setup() {
      return {
        onRowClick: action('click'),
      };
    },
    template: `
      <unnnic-table version="2" :style="{ maxWidth: '800px' }">
        <TableHeader>
          <unnnic-table-row>
            <TableHead width="50%">Invoice</TableHead>
            <TableHead width="20%">Status</TableHead>
            <TableHead width="15%">Method</TableHead>
            <TableHead width="15%">Amount</TableHead>
          </unnnic-table-row>
        </TableHeader>
        <TableBody>
          <unnnic-table-row>
            <TableCell ellipsis>
              INV001 — With ellipsis lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </TableCell>
            <TableCell>
              <UnnnicTag scheme="green" text="Paid" />
            </TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </unnnic-table-row>
          <unnnic-table-row @click="onRowClick">
            <TableCell>
              INV002 — Without ellipsis lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </TableCell>
            <TableCell>
              <UnnnicTag scheme="red" text="Pending" />
            </TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell>$199.00</TableCell>
          </unnnic-table-row>
        </TableBody>
      </unnnic-table>
    `,
  }),
};

export const ColumnWidth = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the `width` prop on `UnnnicTableHead` to set each column size. Values follow CSS `width` (percentages, pixels, or other length units) and apply to the header cell, which defines the column layout.',
      },
      source: {
        code: `<UnnnicTable version="2">
  <UnnnicTableHeader>
    <UnnnicTableRow>
      <UnnnicTableHead width="50%">Invoice</UnnnicTableHead>
      <UnnnicTableHead width="120px">Method</UnnnicTableHead>
      <UnnnicTableHead width="10%">Amount</UnnnicTableHead>
    </UnnnicTableRow>
  </UnnnicTableHeader>
  <UnnnicTableBody>
    <UnnnicTableRow>
      <UnnnicTableCell>INV001 — Monthly subscription</UnnnicTableCell>
      <UnnnicTableCell>Credit Card</UnnnicTableCell>
      <UnnnicTableCell>$250.00</UnnnicTableCell>
    </UnnnicTableRow>
  </UnnnicTableBody>
</UnnnicTable>`,
      },
    },
  },
  render: () => ({
    components: {
      unnnicTable,
      unnnicTableRow,
      TableHeader,
      TableBody,
      TableHead,
      TableCell,
    },
    template: `
      <unnnic-table version="2">
        <TableHeader>
          <unnnic-table-row>
            <TableHead width="50%">Invoice (50%)</TableHead>
            <TableHead width="120px">Method (120px)</TableHead>
            <TableHead width="10%">Amount (10%)</TableHead>
          </unnnic-table-row>
        </TableHeader>
        <TableBody>
          <unnnic-table-row>
            <TableCell>INV001 — Monthly subscription with a longer invoice label</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </unnnic-table-row>
          <unnnic-table-row>
            <TableCell>INV002 — Enterprise license</TableCell>
            <TableCell>Wire Transfer</TableCell>
            <TableCell>$1,200.00</TableCell>
          </unnnic-table-row>
        </TableBody>
      </unnnic-table>
    `,
  }),
};

export const Alignment = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the `align` prop on `UnnnicTableHead` and `UnnnicTableCell` to align content to the left, center or right.',
      },
      source: {
        code: `<UnnnicTable version="2">
  <UnnnicTableHeader>
    <UnnnicTableRow>
      <UnnnicTableHead>Product</UnnnicTableHead>
      <UnnnicTableHead align="right">Quantity</UnnnicTableHead>
      <UnnnicTableHead align="right">Amount</UnnnicTableHead>
    </UnnnicTableRow>
  </UnnnicTableHeader>
  <UnnnicTableBody>
    <UnnnicTableRow>
      <UnnnicTableCell>Marketing plan</UnnnicTableCell>
      <UnnnicTableCell align="right">12</UnnnicTableCell>
      <UnnnicTableCell align="right">$1,200.00</UnnnicTableCell>
    </UnnnicTableRow>
  </UnnnicTableBody>
</UnnnicTable>`,
      },
    },
  },
  render: () => ({
    components: {
      unnnicTable,
      unnnicTableRow,
      TableHeader,
      TableBody,
      TableHead,
      TableCell,
    },
    template: `
      <unnnic-table version="2">
        <TableHeader>
          <unnnic-table-row>
            <TableHead>Product</TableHead>
            <TableHead align="center">Quantity</TableHead>
            <TableHead align="right">Amount</TableHead>
          </unnnic-table-row>
        </TableHeader>
        <TableBody>
          <unnnic-table-row>
            <TableCell>Marketing plan</TableCell>
            <TableCell align="center">12</TableCell>
            <TableCell align="right">$1,200.00</TableCell>
          </unnnic-table-row>
          <unnnic-table-row>
            <TableCell>Support package</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="right">$450.00</TableCell>
          </unnnic-table-row>
        </TableBody>
      </unnnic-table>
    `,
  }),
};

export const SlotContent = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the default slot on `UnnnicTableCell` to render custom components such as tags or buttons.',
      },
      source: {
        code: `<UnnnicTable version="2">
  <UnnnicTableHeader>
    <UnnnicTableRow>
      <UnnnicTableHead>Name</UnnnicTableHead>
      <UnnnicTableHead>Status</UnnnicTableHead>
      <UnnnicTableHead align="right">Actions</UnnnicTableHead>
    </UnnnicTableRow>
  </UnnnicTableHeader>
  <UnnnicTableBody>
    <UnnnicTableRow>
      <UnnnicTableCell>Project Alpha</UnnnicTableCell>
      <UnnnicTableCell>
        <UnnnicTag scheme="green" text="Active" />
      </UnnnicTableCell>
      <UnnnicTableCell align="right">
        <UnnnicButton text="Edit" size="small" type="secondary" />
      </UnnnicTableCell>
    </UnnnicTableRow>
  </UnnnicTableBody>
</UnnnicTable>`,
      },
    },
  },
  render: () => ({
    components: {
      unnnicTable,
      unnnicTableRow,
      TableHeader,
      TableBody,
      TableHead,
      TableCell,
      UnnnicTag,
      UnnnicButton,
    },
    template: `
      <unnnic-table version="2">
        <TableHeader>
          <unnnic-table-row>
            <TableHead width="40%">Name</TableHead>
            <TableHead width="15%">Status</TableHead>
            <TableHead width="15%" align="right">Actions</TableHead>
          </unnnic-table-row>
        </TableHeader>
        <TableBody>
          <unnnic-table-row>
            <TableCell>Project Alpha</TableCell>
            <TableCell>
              <UnnnicTag scheme="green" text="Active" />
            </TableCell>
            <TableCell align="right">
              <UnnnicButton text="Edit" size="small" type="secondary" />
            </TableCell>
          </unnnic-table-row>
          <unnnic-table-row>
            <TableCell>Project Beta</TableCell>
            <TableCell>
              <UnnnicTag scheme="orange" text="Pending" />
            </TableCell>
            <TableCell align="right">
              <UnnnicButton text="Edit" size="small" type="secondary" />
            </TableCell>
          </unnnic-table-row>
        </TableBody>
      </unnnic-table>
    `,
  }),
};

export const ClickableRow = {
  parameters: {
    docs: {
      description: {
        story:
          'Attach `@click` to `UnnnicTableRow` to make rows interactive. Keyboard users can activate the row with Enter or Space.',
      },
      source: {
        code: `<UnnnicTable version="2">
  <UnnnicTableHeader>
    <UnnnicTableRow>
      <UnnnicTableHead width="50%">Invoice</UnnnicTableHead>
      <UnnnicTableHead width="20%">Status</UnnnicTableHead>
      <UnnnicTableHead width="15%">Method</UnnnicTableHead>
      <UnnnicTableHead width="15%" align="right">Amount</UnnnicTableHead>
    </UnnnicTableRow>
  </UnnnicTableHeader>
  <UnnnicTableBody>
    <UnnnicTableRow
      v-for="(row, index) in rows"
      :key="index"
      @click="handleRowClick(row)"
    >
      <UnnnicTableCell>{{ row.invoice }}</UnnnicTableCell>
      <UnnnicTableCell>
        <UnnnicTag :scheme="row.status.scheme" :text="row.status.text" />
      </UnnnicTableCell>
      <UnnnicTableCell>{{ row.method }}</UnnnicTableCell>
      <UnnnicTableCell align="right">{{ row.amount }}</UnnnicTableCell>
    </UnnnicTableRow>
  </UnnnicTableBody>
</UnnnicTable>`,
      },
    },
  },
  render: () => ({
    components: {
      unnnicTable,
      unnnicTableRow,
      TableHeader,
      TableBody,
      TableHead,
      TableCell,
      UnnnicTag,
    },
    setup() {
      return {
        onRowClick: action('click'),
        rows: tableRows,
      };
    },
    template: `
      <unnnic-table version="2" :style="{ maxWidth: '800px' }">
        <TableHeader>
          <unnnic-table-row>
            <TableHead width="50%">Invoice</TableHead>
            <TableHead width="20%">Status</TableHead>
            <TableHead width="15%">Method</TableHead>
            <TableHead width="15%" align="right">Amount</TableHead>
          </unnnic-table-row>
        </TableHeader>
        <TableBody>
          <unnnic-table-row
            v-for="(row, index) in rows"
            :key="index"
            @click="onRowClick"
          >
            <TableCell>{{ row.invoice }}</TableCell>
            <TableCell>
              <UnnnicTag :scheme="row.status.scheme" :text="row.status.text" />
            </TableCell>
            <TableCell>{{ row.method }}</TableCell>
            <TableCell align="right">{{ row.amount }}</TableCell>
          </unnnic-table-row>
        </TableBody>
      </unnnic-table>
    `,
  }),
};

export const WithoutEllipsis = {
  parameters: {
    docs: {
      description: {
        story:
          'Set `:ellipsis="false"` on `UnnnicTableCell` to show the full text. Ellipsis is enabled by default.',
      },
      source: {
        code: `<UnnnicTable version="2">
  <UnnnicTableHeader>
    <UnnnicTableRow>
      <UnnnicTableHead width="70%">Description</UnnnicTableHead>
      <UnnnicTableHead width="30%">Reference</UnnnicTableHead>
    </UnnnicTableRow>
  </UnnnicTableHeader>
  <UnnnicTableBody>
    <UnnnicTableRow>
      <UnnnicTableCell :ellipsis="false">
        The lazy fox jumps over the quick brown dog while carrying a very long description.
      </UnnnicTableCell>
      <UnnnicTableCell :ellipsis="false">REF-0000123456789</UnnnicTableCell>
    </UnnnicTableRow>
  </UnnnicTableBody>
</UnnnicTable>`,
      },
    },
  },
  render: () => ({
    components: {
      unnnicTable,
      unnnicTableRow,
      TableHeader,
      TableBody,
      TableHead,
      TableCell,
    },
    template: `
      <unnnic-table version="2" :style="{ maxWidth: '600px' }">
        <TableHeader>
          <unnnic-table-row>
            <TableHead width="70%">Description</TableHead>
            <TableHead width="30%">Reference</TableHead>
          </unnnic-table-row>
        </TableHeader>
        <TableBody>
          <unnnic-table-row>
            <TableCell :ellipsis="false">
              The lazy fox jumps over the quick brown dog while carrying a very long description that should wrap.
            </TableCell>
            <TableCell :ellipsis="false">REF-0000123456789</TableCell>
          </unnnic-table-row>
          <unnnic-table-row>
            <TableCell :ellipsis="false">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </TableCell>
            <TableCell :ellipsis="false">REF-0000987654321</TableCell>
          </unnnic-table-row>
        </TableBody>
      </unnnic-table>
    `,
  }),
};
