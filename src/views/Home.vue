<template>
    <section class="home-dashboard" v-if="leads">
        <v-row no-gutters>
            <v-col cols="4" sm="6">
                <v-card elevation="2" class="mr-4 my-12">
                    <div class="text-h6 text--primary pa-6">
                        Our Top Caller
                    </div>

                    <div class="callers" v-if="topCallers">
                        <p class="px-6">
                            {{ topCallers[0][0] }} with {{ topCallers[0][1] }} calls 👏
                        </p>
                    </div>

                    <v-card-actions>
                        <v-btn color="deep-purple lighten-2" class="px-4" text @click="goToLeads">
                            Go To Leads
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="4" sm="6">
                <v-card class="ml-4 my-12">
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="white"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                    >
                        <v-sparkline
                            :labels="labels"
                            :value="value"
                            :gradient="gradient"
                            :smooth="radius || false"
                            :padding="padding"
                            :line-width="widthSource"
                            :stroke-linecap="lineCap"
                            :gradient-direction="gradientDirection"
                            :fill="fill"
                            :type="typeSource"
                            :auto-line-width="autoLineWidth"
                            auto-draw
                            color="black"
                        ></v-sparkline>
                    </v-sheet>

                    <v-card-text class="pt-0">
                        <div class="text-h6  font-weight-light mb-2">
                            Leads Source
                        </div>
                        <div class="subheading font-weight-light grey--text">
                            Last Campaign Performance
                        </div>
                        <v-divider class="my-2"></v-divider>
                        <v-icon class="mr-2" small>
                            mdi-clock
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">
                            last registration 26 minutes ago
                        </span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col sm="12">
                <v-card class=" mx-auto">
                    <div id="chart-container" v-if="dataSource.data">
                        <fusioncharts
                            :type="type"
                            :width="width + '%'"
                            :height="height"
                            :dataformat="dataFormat"
                            :dataSource="dataSource"
                        >
                        </fusioncharts>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import { leadService } from '../services/lead-service.js';

const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
];

const dataSource = {
    chart: {
        caption: 'Calls Distribution in our team',
        decimals: '0',
        theme: 'fusion',
    },
    data: [],
};

export default {
    name: 'home',
    data() {
        return {
            leads: null,
            topCallers: null,
            labels: [],
            value: [],
            gradientDirection: 'top',
            gradients,
            fill: false,
            typeSource: 'trend',
            autoLineWidth: false,
            widthSource: 2,
            radius: 10,
            padding: 20,
            lineCap: 'round',
            gradient: gradients[5],
            type: 'doughnut2d',
            renderAt: 'chart-container',
            width: '100',
            height: '350',
            dataFormat: 'json',
            dataSource,
        };
    },
    created() {
        this.loadLeads();
    },

    methods: {
        async loadLeads() {
            this.leads = await leadService.query();
            this.findTopCallers();
            this.findTopSoruce();
        },
        findTopCallers() {
            const callersNameMap = {};
            this.dataSource.data = [];

            this.leads.forEach((lead) => {
                callersNameMap[lead.caller] = callersNameMap[lead.caller]
                    ? callersNameMap[lead.caller] + 1
                    : 1;
            });

            this.topCallers = Object.entries(
                Object.fromEntries(Object.entries(callersNameMap).sort(([, a], [, b]) => b - a))
            );

            this.topCallers.forEach((emp) => {
                const dataObj = { label: emp[0], value: emp[1] };
                this.dataSource.data.push(dataObj);
            });

            // this.topCallers = Object.entries(sortable);
        },
        findTopSoruce() {
            const sourceNameMap = {};
            this.leads.forEach((lead) => {
                sourceNameMap[lead.leadSrc] = sourceNameMap[lead.leadSrc]
                    ? sourceNameMap[lead.leadSrc] + 1
                    : 1;
            });

            const sortable = Object.entries(
                Object.fromEntries(Object.entries(sourceNameMap).sort(([, a], [, b]) => b - a))
            );
            sortable.forEach((source, idx) => {
                this.labels[idx] = source[0];
                this.value[idx] = source[1];
            });
        },
        goToLeads() {
            this.$router.push('leads');
        },
    },
};
</script>
