export const generatePdfTable = (tableData) => {
    console.log(tableData);
  
    const tableHtml = `
      <style>
        table{
          width:100%;
        }
        #customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }

        #customers td, #customers th {
        border: 1px solid #ddd;
        padding: 8px;
        }

        #customers tr:nth-child(even){background-color: #f2f2f2;}

        #customers tr:hover {background-color: #ddd;}

        #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: gray;
        color: white;
        }
        </style>

      <table id="customers">
        <thead>
          <tr>
            ${tableData.columns.map((col) => `<th>${col.label}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${tableData.rows.map((row) => `
            <tr>
              <td>${row.user_First_Name}</td>
              <td>${row.user_Last_Name}</td>
              <td>${row.user_Title}</td>
              <td>${row.user_Email}</td>
              <td>${row.user_Phone}</td>
               <td>${row.user_UserName}</td>
                <td>${row.user_Active}</td>
            </tr>
          `).join('')}
          
        </tbody>
      </table>
    `;
  
    return tableHtml;
  };