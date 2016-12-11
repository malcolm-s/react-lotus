import React, { Component } from 'react';
import { SheetStore } from './SheetStore';
import { SheetAdapter } from './SheetAdapter';
import { Sheet } from './Sheet';

export class App extends Component {
    render() {
        const store = new SheetStore();
        const adapter = new SheetAdapter(store);

        return (
            <Sheet adapter={adapter} />
        );
    }
}