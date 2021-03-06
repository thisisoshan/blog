import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeroHead from '../components/HeroHead'
import BlogPost from '../components/BlogPost'
import Head from 'next/head'
import 'isomorphic-fetch'

export default class extends React.Component {

    static async getInitialProps() {
        const res = await fetch('http://thisisoshan.co.nf/wp/?json=1')
        const data = await res.json()
        return { data }
    }

    render() {
        return(
            <div>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Blog - Oshan Shrestha</title>

                    <link rel="stylesheet" href="static/build/styles/global.css" />
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                </Head>
                <main>
                    <HeroHead fullName="Oshan Shrestha" slogan="A high-school graduate web developer" type="BLOG" />
                    {
                        this.props.data.posts.map(function(post, i) {
                            return <BlogPost key={i} slug={post.slug} title={post.title} content={post.excerpt} date={post.date.substring(0, 11)} category={post.categories} />
                        })
                    }
                </main>
            </div>
        )
    }
}