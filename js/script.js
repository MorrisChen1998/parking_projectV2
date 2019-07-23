var bookDataFromLocalStorage = [];
var totalBooks;
$(function () {
    loadBookData();
    var data = [
        { text: "資料庫", value: "database" },
        { text: "網際網路", value: "internet" },
        { text: "應用系統整合", value: "system" },
        { text: "家庭保健", value: "home" },
        { text: "語言", value: "language" }
    ]
    $("#book_category").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        index: 0,
        change: onChange
    });
    $("#bought_datepicker").kendoDatePicker({
        format: "yyyy-MM-dd",
        parseFormats: ["yyyy-MM-dd"],
        value: new Date()
    });

    //要使用kendo validate該標籤需要加required
    $("#book_name").prop('required', true);
    $("#book_author").prop('required', true);
    //custom message
    var valid_book_name = $("#book_name").kendoValidator({
        messages: {
            required: "Book name is required.",
        }
    }).data("kendoValidator");
    var valid_book_author = $("#book_author").kendoValidator({
        messages: {
            required: "Author name is required.",
        }
    }).data("kendoValidator");
    var valid_bought_datepicker = $("#bought_datepicker").kendoValidator({
        rules: {
            datepicker: function (input) {
                return kendo.parseDate(input.val(), "yyyy-MM-dd") != null;
            }
        },
        messages: {
            datepicker: "Illegal date format."
        }
    }).data("kendoValidator");

    //驗證後執行addBook
    $(".btn-add-book").kendoButton().click(function () {
        var book = valid_book_name.validate();
        var author = valid_book_author.validate();
        var date = valid_bought_datepicker.validate();
        if (book && author && date) {
            addBook();
        }
    });

    $("#book_grid").kendoGrid({
        dataSource: {
            data: bookDataFromLocalStorage,
            schema: {
                model: {
                    fields: {
                        BookId: { type: "int" },
                        BookName: { type: "string" },
                        BookCategory: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "string" }
                    }
                }
            },
            pageSize: 20,
        },
        toolbar: kendo.template("<div class='book-grid-toolbar'><input class='book-grid-search' placeholder='我想要找......' type='text'></input></div>"),
        height: 550,
        sortable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "BookId", title: "書籍編號", width: "10%" },
            { field: "BookName", title: "書籍名稱", width: "50%" },
            { field: "BookCategory", title: "書籍種類", width: "10%" },
            { field: "BookAuthor", title: "作者", width: "15%" },
            { field: "BookBoughtDate", title: "購買日期", width: "15%" },
            { command: { text: "刪除", click: deleteBook }, title: " ", width: "120px" }
        ]

    });
    //搜尋欄只要輸入東西就觸發
    $(".book-grid-search").on("input", function (e) {
        searchBook(e);
    });
})

function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem("bookData"));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem("bookData", JSON.stringify(bookDataFromLocalStorage));
    }
    totalBooks = bookDataFromLocalStorage.length;//紀錄書籍編號
}

function onChange() {//隨著selectbox選到的內容改變圖片
    var value = this.value();
    $(".book-image").attr("src", "./image/" + value + ".jpg");
}

function addBook() {
    var grid = $("#book_grid").data("kendoGrid");
    totalBooks = totalBooks + 1;//書籍編號+1
    var data = {
        BookId: totalBooks, BookName: $("#book_name").val(),
        BookCategory: $("#book_category").children("option:selected").text(),
        BookAuthor: $("#book_author").val(), BookBoughtDate: $("#bought_datepicker").val()
    };

    bookDataFromLocalStorage.push(data);
    grid.dataSource.add(data);
    alert("新增成功");
}

function deleteBook(e) {
    var grid = $("#book_grid").data("kendoGrid");
    //找到target的html標籤
    var tr = $(e.target).closest("tr");
    var data = this.dataItem(tr);
    var data_array = {
        BookId: data.BookId,
        BookName: data.BookName,
        BookCategory: data.BookCategory,
        BookAuthor: data.BookAuthor,
        BookBoughtDate: data.BookBoughtDate
    };
    var index = bookDataFromLocalStorage.findIndex(x => x.BookId === data_array.BookId);

    bookDataFromLocalStorage.splice(index, 1);
    grid.dataSource.remove(data);
    alert("刪除成功");
}

function searchBook(e) {
    var grid = $('#book_grid').data('kendoGrid');
    var columns = grid.columns;
    var filter = {
        logic: 'or', filters: []
    };
    //loop column
    columns.forEach(function (column) {
        if (column.field) {
            //判斷當前field的data type
            var type = grid.dataSource.options.schema.model.fields[column.field].type;
            //若符合target的字串則將其加入filter
            if (type == 'int') {
                filter.filters.push({
                    field: column.field,
                    operator: 'eq',
                    value: parseInt(e.target.value)
                })
            } else if (type == 'string') {
                filter.filters.push({
                    field: column.field,
                    operator: 'contains',
                    value: e.target.value
                })
            }
        }
    });
    //過濾符合的項目
    grid.dataSource.filter(filter);
}