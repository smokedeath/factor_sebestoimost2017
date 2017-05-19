

var uitree = function () {


    var inituitree = function () {

        $('#tree_3').jstree({
            'plugins': ["wholerow", "checkbox", "types"],

            'core': {
                "multiple": false,
                'data': [
                    {"id": "seb", "parent": "#", "text": "Себестоимость" ,"state":{"opened":true,"selected":false}},
                    {"id": "seb_zav", "parent": "seb", "text": "Зависящая часть"},
                    {"id": "seb_usl", "parent": "seb", "text": "Условно-постоянная часть"},
                    {"id": "seb_pol", "parent": "seb", "text": "Полная часть"},


                    {
                        "id": "du",
                        "parent": "#",
                        "text": "Доля участников",
                        "state": {"opened": true, "selected": false}
                    },
                    {"id": "du_zav", "parent": "du", "text": "Зависящая часть",  },
                    {"id": "du_usl", "parent": "du", "text": "Условно-постоянная часть"},
                    {"id": "du_pol", "parent": "du", "text": "Полная часть"}


                ]

            },

            "checkbox": {
                "visible": false
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            }

        });

    };



    return {

        //main function to initiate the module
        init: function () {



            inituitree();



        }

    };

}();