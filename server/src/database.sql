
CREATE TABLE task_lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(15),
    list_id INT NOT NULL REFERENCES task_lists(id) ON DELETE CASCADE,
    list_name VARCHAR(50) NOT NULL 
);

CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,    
    action_type VARCHAR(50) NOT NULL,
    action_description TEXT,
    from_column VARCHAR(50), 
    to_column VARCHAR(50),   
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
