import axios from 'axios'
import Cookies from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import DynamicHead from '../../src/components/DynamicHead'
import TaskTablet from '../../src/components/TaskTablet'

function Folder() {

  return (
    <div>
      <DynamicHead title="Todo List" description="Manage your Todo list with multiple folders." keywords="todo list" />
      <div className="home">
        <TaskTablet />
      </div>
    </div>
  )
}

export default Folder;
