class API {
    async getData(){
        const query = await fetch('https://urbangraffitilogin.com/API/v2/index.php/')
        const data = query.json()
        return data
    }
    
    async valLogin(user,pass){
    
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/login/user_login?username='+user+'&password='+pass)
        const data = query.json()
        return data
    }
    
    
    async get_orders(user_id,token){
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/orders_list?user_id='+user_id+'&token='+token+'')
        console.log(query);
        const data = query.json()
        return data
    }

    async get_orders2(user_id,token,latitude,longitude){
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/orders_list2?user_id='+user_id+'&token='+token+'&latitude='+latitude+'&longitude='+longitude)
        console.log(query);
        const data = query.json()
        return data
    }

    async get_info_new_order(user_id,token){
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/get_info_new_order?user_id='+user_id+'&token='+token+'')
        const data = query.json()
        return data
    }

    async get_zone_new_order(user_id,token,latitude,londitude){
        let body = new FormData();
        body.append("token", token);
        body.append("user_id", user_id);
        body.append("longitude", latitude);
        body.append("latitude", londitude);
        console.log(body);
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/determinate_inside',{ method: 'POST',headers:{ "Content-Type": "multipart/form-data", "otherHeader": "foo", } , body :body})
        console.log(query);
        const data = query.json()
        return data
    }

    async get_zone_new_order2(user_id,token,contract_id,zones_id){
        let body = new FormData();
        body.append("token", token);
        body.append("user_id", user_id);
        body.append("contract_id", contract_id);
        body.append("zones_id", zones_id);
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/get_zones_contract',{ method: 'POST',headers:{ "Content-Type": "multipart/form-data", "otherHeader": "foo", } , body :body})
        console.log(query);
        const data = query.json()
        return data
    }

    async new_order(user_id,token,location,address_lat,address_long,contract_id,zone_id,status,notes,surface_id,service_id,square_footage,priority){
        let body = new FormData();
        body.append("token", token);
        body.append("user_id", user_id);
        body.append("location", location);
        body.append("address_lat", address_lat);
        body.append("address_long", address_long);
        body.append("contract_id", contract_id);
        body.append("zone_id", zone_id);
        body.append("notes", notes);
        body.append("status", status);
        body.append("surface_id", surface_id);
        body.append("service_id", service_id);
        body.append("square_footage", square_footage);
        body.append("priority", priority);
        console.log(body);
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/new_order',{ method: 'POST',headers:{ "Content-Type": "multipart/form-data", "otherHeader": "foo", } , body :body})
        console.log(query);
        const data = query.json()
        return data
    }

    

    async get_order(user_id,token,order_id){
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/get_order?user_id='+user_id+'&token='+token+'&order_id='+order_id)
        console.log(query);
        const data = query.json()
        return data
    }

    async upload_img(user_id,token,order_id,file_route,correlative,type){
        try {
            let body = new FormData();
            body.append("token", token);
            body.append("user_id", user_id);
            body.append("order_id", order_id);
            body.append("correlative", correlative);
            body.append("type", type);
            body.append('photo', {uri: file_route,name: 'photo.jpg',filename :'imageName.jpg',type: 'image/jpg'});
            const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/upload_image',{ method: 'POST',headers:{ "Content-Type": "multipart/form-data", "otherHeader": "foo", } , body :body})
            console.log(query);
            const data = query.json()
            return data
        } catch (error) {
            console.error(error);
        }

    }

    async update_order(user_id,token,order_id,tech_status,surface_id,service_id,square_footage,notes,location,address_lat,address_long,contract_id,zone_id,priority, reason, r_reason){
        let body = new FormData();
        body.append("token", token);
        body.append("user_id", user_id);
        body.append("order_id", order_id);
        body.append("status_edit", tech_status);
        body.append("surface_id", surface_id);
        body.append("service_id", service_id);
        body.append("square_footage", square_footage);
        body.append("notes", notes);
        body.append("location", location);
        body.append("address_lat", address_lat);
        body.append("address_long", address_long);
        body.append("contract_id", contract_id);
        body.append("zone_id", zone_id);
        body.append("priority", priority);
        body.append("reason", reason);
        body.append("r_reason", r_reason);
        console.log(body);
        const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/update_order',{ method: 'POST',headers:{ "Content-Type": "multipart/form-data", "otherHeader": "foo", } , body :body})
        console.log(query);
        const data = query.json()
        return data
    }

    async new_note(user_id,token,order_id,note){
        try {
            let body = new FormData();
            body.append("token", token);
            body.append("user_id", user_id);
            body.append("order_id", order_id);
            body.append("note", note);
            console.log(body);
            const query = await fetch('https://urbangraffitilogin.com/API/v1/index.php/work_orders/new_note',{ method: 'POST',headers:{ "Content-Type": "multipart/form-data", "otherHeader": "foo", } , body :body})
            console.log(query);
            const data = query.json()
            return data
        } catch (error) {
            console.error(error);
        }
    }
    
    
}

export default new API()