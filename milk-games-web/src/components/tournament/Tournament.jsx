/**
 * @typedef {import("@types/index.d").Tournament} Tournament
 */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '@actions/tournament';
import { Box, Flex, Heading, Text, useColorMode } from '@chakra-ui/react';

import Header from '@components/common/Header';
import SectionHeading from '@components/common/SectionHeading';

import { TournamentService } from '@utils/api-service';
import Bracket from './bracket/Bracket';

/**
 *
 * Teams
 * Bracket + matches
 *
 */

const Tournament = () => {
  const dispatch = useDispatch();

  // const tournament = useSelector(state => state.tournament);
  /**
   * @type {[Tournament, Function]}
   */
  const [tournament, setTournament] = useState({});
  const matches = useRef([]);

  const { colorMode } = useColorMode();

  useEffect(() => {
    TournamentService.get(1).then(tournament => {
      setTournament(tournament);
      matches.current = tournament.matches;
      // dispatch(set(tournament));
    });
  }, []);

  return (
    <Box w="100%">
      <Header />

      <Box
        mt={24}
        mx="auto"
        w={{ base: '100%', md: '3xl', lg: '4xl' }}
        p={{ base: 4, md: 4 }}
      >
        <SectionHeading title="RULES"></SectionHeading>
        {/* Table of the teams? */}
        {/* List of all team cards */}
      </Box>

      <Box
        mt={24}
        mx="auto"
        w={{ base: '100%', md: '3xl', lg: '4xl' }}
        p={{ base: 4, md: 4 }}
      >
        <SectionHeading title="TEAMS"></SectionHeading>
        {/* Table of the teams? */}
        {/* List of all team cards */}
      </Box>

      <Box
        mt={24}
        mx="auto"
        w={{ base: '100%', md: '3xl', lg: '4xl' }}
        p={{ base: 4, md: 4 }}
      >
        <SectionHeading title="BRACKET"></SectionHeading>
        <Bracket matchesRef={matches} teamLimit={tournament.teamLimit} />

        {/* Table of the teams? */}
        {/* List of all team cards */}
      </Box>

      <Box h="300px"></Box>
    </Box>
  );
};

export default Tournament;
