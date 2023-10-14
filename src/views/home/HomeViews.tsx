'use client'

import GridViewDocsList from '@/components/GridViewDocsList/GridViewDocsList';
import { PublicService, MainService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Jumbotron from './partials/Jumbotron';

function HomeViews() {

  const documents = useQuery(["documents"], () => MainService.Documents.getAll({
    isArchived: false,
    limit: 1000,
    page: 1,
    title: "",
    isNotify: false,
    status: "APPROVED"
  }))

  return (
    <div className='bg-gray-200 dark:bg-gray-700 dark:text-white pb-16 min-h-screen'>
      <Jumbotron />
      <h1 className='text-center text-2xl font-light mb-8'>Daftar Dokumen Terpublikasi</h1>
      <GridViewDocsList documents={documents?.data?.data} />
    </div>
  );
}

export default HomeViews;