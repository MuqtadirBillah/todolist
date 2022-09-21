import Head from 'next/head'
import Image from 'next/image'
import DynamicHead from '../src/components/DynamicHead'

export default function Home() {
  return (
    <div>
      <DynamicHead title="Todo List" description="Manage your Todo list with multiple folders." keywords="todo list" />
    </div>
  )
}
