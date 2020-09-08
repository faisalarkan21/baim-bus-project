// Call the dataTables jQuery plugin
var record = 0;
$(document).ready(function() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                url: "/api/getAllTrips",
                dataType: "json",
                type: "POST",
                contentType: "application/json"
            },
//            update: {
//                url: "/api/updateBus",
//                dataType: "json",
//                type: "POST",
//                contentType: "application/json"
//            },
//            destroy: {
//                url: "/api/deleteBus",
//                dataType: "json",
//                type: "POST",
//                contentType: "application/json"
//            },
//            create: {
//                url: "/api/addBus",
//                dataType: "json",
//                type: "POST",
//                contentType: "application/json"
//            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                }
            }
        },
        batch: true,
        pageSize: 10,
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { editable: false, nullable: true },
                    busId: { validation: { required: true } },
                    sourceStopId: { validation: { required: true } },
                    destStopId: { validation: { required: true } },
                    journeyTime: { type: "number", validation: { required: true, min: 0} },
                    fare: { type: "number", validation: { required: true, min: 0} },
                }
            }
        },
        sort: {
            field: "code",
            dir: "asc"
        }
   });
   $("#grid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        height: 400,
        filterable: true,
        sortable: true,
        pageable: {
            alwaysVisible: true,
            pageSizes: [5, 10, 20, 100]
        },
        toolbar: ["create", "save", "cancel"],
        columns: [
            {
                title: "#",
                template: "#=++record #",
                attributes: {
                   style: "text-align: center;"
                },
                headerAttributes: {
                   style: "text-align: center;"
                },
                width: 50
            },
            {
                field: "bus.code",
                width: 200,
                title:"Bus Code"
            },
            {
                field: "stop.name",
                title: "Source Stop",
                // format: "{0:c}",
                width: 150,
                attributes: {
                    style: "text-align: center;"
                },
                headerAttributes: {
                    style: "text-align: center;"
                }
            },
            {
                field: "stopDestination.name",
                title: "Destination Stop",
                width: 150,
                attributes: {
                    style: "text-align: center;"
                },
                headerAttributes: {
                    style: "text-align: center;"
                }
            },
            {
                field: "journeyTime",
                title: "Duration",
                width: 150,
                attributes: {
                     style: "text-align: center;"
                },
                headerAttributes: {
                     style: "text-align: center;"
                }
            },
            {
                field: "fare",
                title: "Fare",
                width: 150,
                attributes: {
                      style: "text-align: center;"
                },
                headerAttributes: {
                      style: "text-align: center;"
                }
            },
            {
                command: "destroy",
                title: "Action",
                width: 150,
                filterable: false,
                attributes: {
                    style: "text-align: center;"
                },
                headerAttributes: {
                    style: "text-align: center;"
                }
            }
        ],
        editable: true,
        dataBinding: function() {
            record = (this.dataSource.page() -1) * this.dataSource.pageSize();
        }
   });

   var grid = $("#grid").data("kendoGrid");

});