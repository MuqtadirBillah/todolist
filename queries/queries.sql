use u812210942_todolist;

create table user(
	user_id int not null auto_increment primary key,
    user_email varchar(50) not null unique,
    user_first_name varchar(50),
    user_last_name varchar(50),
    user_password varchar(255),
    user_role varchar(10) default("user"),
    creation_date varchar(20),
    updation_date varchar(20),
    isActive varchar(10) default("true"),
    isBlock varchar(10) default("false"),
    pin_code varchar(10)
);

create table folder(
	folder_id int not null auto_increment primary key,
    folder_name varchar(50),
    folder_description varchar(255),
    creation_date varchar(20)
);

create table task(
	task_id int not null auto_increment primary key,
    task_name varchar(255),
    task_status varchar(50) default("pending"),
    creation_date varchar(50),
    updation_date varchar(50)
);

create table userfolder(
	uf_id int not null auto_increment primary key,
    user_id int,
    folder_id int,
    foreign key (user_id) references user(user_id),
    foreign key (folder_id) references folder(folder_id)
);

create table foldertask(
	ft_id int not null auto_increment primary key,
    folder_id int,
    task_id int,
    foreign key (task_id) references task(task_id),
    foreign key (folder_id) references folder(folder_id)
);

select f.folder_id, f.folder_name, f.folder_description from userfolder as uf inner join folder as f on f.folder_id=uf.folder_id where uf.user_id="2";