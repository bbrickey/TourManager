"use client";

/////code from https://ui.shadcn.com/docs/components/data-table#row-selection

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type LedgerData = {
  id: string;
  account_type: string;
  category: string;
  subcategory: string;
  value: number;
  event_id: string;
  notes: string;
  tour_id: string;
  created_at: string;
};
/*
const [tourData, setTourData] = useState([{ id: "", name: "" }]);
const [eventData, setEventData] = useState([{ id: "", name: "", tour_id: "" }]);

const getTours = async () => {
  await fetch("/api/tours", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setTourData(data);
      //console.log("tour data: " + tourData);
    });
};

const getEvents = async () => {
  await fetch("/api/event", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setEventData(data);

      //console.log("event data: " + JSON.stringify(data));
    });
};

useEffect(() => {
  getTours();
  getEvents();
}, []);

const getTourName = (id: String) => {
  for (let i = 0; i < tourData.length; i++) {
    if (tourData[i].id === id) {
      return tourData[i].name;
    }
  }
};

const getEventName = (id: String) => {
  for (let i = 0; i < eventData.length; i++) {
    if (eventData[i].id === id) {
      return eventData[i].name;
    }
  }
};
*/

export const columns: ColumnDef<LedgerData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "account_type",
    header: "Account Type",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "tour_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "event_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
