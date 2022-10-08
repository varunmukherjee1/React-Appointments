import {format} from "date-fns"

export const userColumns = [
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Email",
        accessor: "email"
    },
    {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({value}) => {
            return format(new Date(value),"dd/MM/yyyy")
        }
    },
    {
        Header: "Actions",
        accessor: "actions",
        Cell: () => {
            return (
                <button>Block</button>
            );
        }
    }
]

export const doctorColumns = [
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Phone",
        accessor: "phoneNumber"
    },
    {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({value}) => {
            return format(new Date(value),"dd/MM/yyyy")
        }
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Actions",
        accessor: "actions",
        Cell: ({row,value}) => {
            return (
                <div>
                    {(row.original.status === "pending") && <button>Approve</button>}
                    {(row.original.status === "approved") && <button>Block</button>}
                </div>
            );
        }
    }
]