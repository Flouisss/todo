import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Todo() {
    // Estado para almacenar el valor de la nueva tarea
    const [task, setTask] = useState('');
    // Estado para almacenar la lista de tareas
    const [tasks, setTasks] = useState([]);
    // Estado para almacenar la fecha seleccionada en el selector de fecha
    const [selectedDate, setSelectedDate] = useState(null);

    // Función useEffect que se ejecuta cuando el componente se monta por primera vez
    useEffect(() => {
        // Cargar las tareas almacenadas en el localStorage, si existen
        if (localStorage.getItem("localTasks")) {
            const storedList = JSON.parse(localStorage.getItem("localTasks"));
            setTasks(storedList);
        }
    }, []);

    // Función para agregar una nueva tarea a la lista de tareas
    const addTask = () => {
        // Verificar que el campo de tarea y la fecha seleccionada no estén vacíos
        if (task && selectedDate) {
            // Crear un nuevo objeto de tarea con un ID único y la fecha en formato de cadena
            const newTask = {
                id: new Date().getTime().toString(),
                title: task,
                date: selectedDate.toLocaleDateString()
            };
            // Agregar la nueva tarea a la lista de tareas
            setTasks([...tasks, newTask]);
            // Guardar la lista actualizada en el localStorage
            localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
            // Reiniciar los valores de tarea y fecha seleccionada
            setTask("");
            setSelectedDate(null);
        }
    };

    // Función para eliminar una tarea de la lista
    const taskDelete = (taskId) => {
        // Filtrar la lista de tareas para excluir la tarea con el ID proporcionado
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        // Actualizar la lista de tareas con las tareas filtradas
        setTasks(updatedTasks);
        // Guardar la lista actualizada en el localStorage
        localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
    };

    // Función para eliminar todas las tareas de la lista
    const tasksClear = () => {
        // Establecer la lista de tareas en un array vacío
        setTasks([]);
        // Eliminar la lista de tareas del localStorage
        localStorage.removeItem("localTasks");
    };

    // Renderizar el componente Todo
    return (
        <div className='container row'>
            <h1 className="mt-3 text-white">To-Do List</h1>
            {/* Input para escribir una nueva tarea */}
            <div className='col-8'>
                <input
                    name='task'
                    type='text'
                    value={task}
                    placeholder="Escribir una nueva tarea"
                    className="form-control"
                    onChange={(e) => setTask(e.target.value)}
                />
            </div>
            {/* Selector de fecha */}
            <div className='col-3'>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    className="form-control"
                    placeholderText="Seleccionar fecha"
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()} // Establecer la fecha mínima como la fecha actual
                />
            </div>
            {/* Botón para agregar una nueva tarea */}
            <div className='col-1'>
                <button className='btn btn-primary form-control' onClick={addTask}>
                    <i className='material-icons'>add</i>
                </button>
            </div>
            {/* Mostrar el número de tareas */}
            <div className='badge'>
                Tienes
                {tasks.length === 0 ? " 0 tareas por hacer" : tasks.length === 1 ? " 1 tarea" : ` ${tasks.length} tareas`}
            </div>
            {/* Mostrar la lista de tareas */}
            {tasks.map((task) => (
                <React.Fragment key={task.id}>
                    <div className='col-11'>
                        <span className='form-control bg-white btn mt-2' style={{ textAlign: "left", fontWeight: "bold" }}>
                            {task.title} - {task.date}
                        </span>
                    </div>
                    {/* Botón para eliminar una tarea */}
                    <div className='col-1'>
                        <button className=" mt-2 btn btn-warning material-icons" onClick={() => taskDelete(task.id)}>
                            <i className='material-icons'>delete</i>
                        </button>
                    </div>
                </React.Fragment>
            ))}
            {/* Botón para eliminar todas las tareas */}
            {!tasks.length ? null : (
                <div>
                    <button className="btn btn-secondary  mt-4 mb-4" onClick={() => tasksClear()}>
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}
