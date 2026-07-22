import "./DataTable.css";

export default function DataTable({
    columns = [],
    children
}){

    return(

        <div className="data-table">

            <table>

                <thead>

                    <tr>

                        {columns.map(col=>(
                            <th key={col}>
                                {col}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {children}

                </tbody>

            </table>

        </div>

    )

}